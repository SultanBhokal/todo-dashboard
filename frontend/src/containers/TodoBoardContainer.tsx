import React, { useMemo, useState } from 'react'
import { DndProvider, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useDrag } from 'react-dnd';
import { generateUniqueId } from '../utils/otherUtils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Modal1 from '../components/modals/Modal1';
import Modal2 from '../components/modals/Modal2';
import { todo } from '../types/todo';
import { useCalendar } from '../store/zustandStore';
import { api } from '../axios/interceptors';






const Todo = ({ text, column, onDrag, className = "", id = "", handleRemove, handleEdit }: any) => {
  const [, drag] = useDrag({
    type: "TODO",
    item: { text, column, id }
  });

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const handleDelete = () => {
    handleRemove(column, id)
  }

  const handleEditChange = (newValue: string) => {
    handleEdit(column, id, newValue)
  }


  return (
    <div ref={drag} className={className} style={{ border: '1px solid #ccc', padding: '8px', margin: '8px', position: "relative" }}>
      <span className=' absolute left-0' >
        <Modal1 title={column} show={openEdit} setShow={setOpenEdit} edit={true} value={text} handleEdit={handleEditChange} modalTitle={
          <EditIcon color="warning" className=' cursor-pointer transition-opacity hover:opacity-60' />
        } />
      </span>
      {text}
      <span className=' absolute right-0' onClick={() => setOpenDialog(true)}><DeleteForeverIcon color='warning' className=' cursor-pointer transition-opacity hover:opacity-60' /></span>
      <Modal2 title={text} show={openDialog} setShow={setOpenDialog} handleChange={handleDelete} />
    </div>
  );
};

const Column = ({ title, todos, onDrop, className, handleAdd, handleEdit, handleRemove }: any) => {
  const [show, setShow] = useState<boolean>(false)
  const [{ isOver }, drop] = useDrop({
    accept: 'TODO',
    drop: (item: any) => onDrop(item.column, title, item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className=' w-full p-5 border-gray-700 bg-neutral-800 bg-opacity-60 rounded-lg'
      style={{
        border: `1px solid ${isOver ? 'red' : '#ccc'}`,
      }}
    >
      <div className=' bg-neutral-800 text-center rounded-2xl h-10 flex items-center justify-center relative'>
        <span className=' absolute right-5'><Modal1 show={show} setShow={setShow} modalTitle={<AddIcon className=' cursor-pointer text-green-600 transition-opacity hover:opacity-70' />} title={title} handleSave={handleAdd} /></span>
        <h3>{title}</h3>
      </div>
      {todos.map((todo: any, index: any) => (
        <Todo key={index} text={todo.text} id={todo.id} column={title} onDrag={onDrop} className={className} handleRemove={handleRemove} handleEdit={handleEdit} />
      ))}
    </div>
  );
};




function TodoBoardContainer() {
  const layout = {}
  const todo = useCalendar((state) => state.todo)
  const todoId = useCalendar((state) => state.todoId)
  const setTodo = useCalendar((state)=>state.setTodo)
  const setLoading = useCalendar((state)=>state.setLoading)
  const [columns, setColumns] = useState<todo>(todo);
  

  const classNamesForColumns: {
    [key: string]: string;
    TASKS: string;
    IN_PROGRESS: string;
    COMPLETED: string;
  } = {
    'TASKS': "rounded-2xl cursor-grab h-14 text-center bg-blue-500 bg-opacity-60",
    'IN_PROGRESS': "rounded-2xl cursor-grab h-14 text-center bg-orange-300 bg-opacity-60",
    'COMPLETED': "rounded-2xl cursor-grab h-14 text-center bg-green-500 bg-opacity-60 line-through",
  }
  const classNameForBacklog = "rounded-2xl cursor-grab h-14 text-center bg-blue-500 bg-opacity-60"
  const classNameForTasks = "rounded-2xl cursor-grab h-14 text-center bg-orange-300 bg-opacity-60"
  const classNameForCompleted = "rounded-2xl cursor-grab h-14 text-center bg-green-500 bg-opacity-60 line-through"
  let className = ""

  const handleDrop = async (sourceColumn: any, destinationColumn: any, id: any) => {

    if (sourceColumn !== destinationColumn) {
      setLoading(true)
      const sourceTodos = columns[sourceColumn].filter((todo: any) => todo.id !== id);
      const addTodo = columns[sourceColumn].filter((todo: any) => todo.id === id);
      const destinationTodos = [...columns[destinationColumn], ...addTodo];
      const finalData = {
        ...columns,
        [sourceColumn]: sourceTodos,
        [destinationColumn]: destinationTodos,
      }
      setTodo(finalData);
      const res = await api.put("http://localhost:3000/api/dashboard/todo", {
        id: todoId,
        todos: finalData
      });
      if(res){
        setLoading(false)
      }


    }
  };

  const handleRemove = async(sourceColumn: any, id: any) => {
    setLoading(true)
    const filteredColumn = columns[sourceColumn].filter(col => col.id !== id)
    const finalData ={
      ...columns,
      [sourceColumn]: filteredColumn
    }
    const res = await api.put("http://localhost:3000/api/dashboard/todo", {
      id: todoId,
      todos: finalData
    });
    setTodo(finalData)
    if(res){
      setLoading(false)
    }
  }

  const handleAdd = async (data: { id: string, value: string }) => {
    setLoading(true)
    const finalData = {
      ...columns,
      [data.id]: [...columns[data.id], { id: generateUniqueId(), text: data.value }]
    }
    const res = await api.put("http://localhost:3000/api/dashboard/todo", {
      id: todoId,
      todos: finalData
    });
    if(res){
      setLoading(false)
    }
    setTodo(finalData)

  }

  const handleEdit = async (sourceColumn: any, id: any, newValue: string) => {
    setLoading(true)
    const mappedColumns = columns[sourceColumn].map(col => {
      if (col.id === id) {
        col.text = newValue
      }
      return col
    });

    const finalData = {
      ...columns,
      [sourceColumn]: mappedColumns
    }
    const res = await api.put("http://localhost:3000/api/dashboard/todo", {
      id: todoId,
      todos: finalData
    });
    setTodo(finalData)
    if(res){
      setLoading(false)
    }
  }

  useMemo(()=>{
    setColumns(todo)
  },[todo])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=' w-full h-full flex gap-2 ps-2 pe-2 z-50' >
        {Object.entries(columns).map(([columnTitle, todos]) => (
          <Column
            key={columnTitle}
            title={columnTitle}
            todos={todos}
            onDrop={handleDrop}
            className={classNamesForColumns[columnTitle]}
            handleAdd={handleAdd}
            handleRemove={handleRemove}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </DndProvider>

  )
}

export default TodoBoardContainer