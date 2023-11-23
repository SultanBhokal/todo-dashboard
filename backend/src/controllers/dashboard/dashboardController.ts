import { TodoModel, getAllTodos, updateTodo } from "../../models/dashboard/TodoBoardModel";
import { reqBodyTodo, todo } from "../../types/dashboard/todo";
import { Request, Response } from "express";

export async function getTodos(req: Request, res: Response) {
    try {
        const results = await getAllTodos();
        console.log(results)
        if (results.length === 0) {
            const newTodo = new TodoModel({
                'TASKS': [],
                'IN_PROGRESS': [],
                'COMPLETED': [],
            });

            const newTodoResults = await newTodo.save()
            return res.json({ data: [newTodoResults], msg: "Success", success: true, error: "" }).status(200)
        }
        return res.json({ data: results, msg: "Success", success: true, error: "" }).status(200)
    } catch (error) {
        return res.json({ error: "Internal Server Error", msg: "", data: [] }).status(500)
    }
}

export async function updateTodos(req: Request<{}, {}, reqBodyTodo>, res: Response) {
    try {
        const results = await updateTodo(req.body.id,req.body.todos);
        return res.json({ data: results, msg: "Success", success: true, error: "" }).status(200)
    } catch (error) {
        return res.json({ error: "Internal Server Error", msg: "", data: [] }).status(500)
    }
}

