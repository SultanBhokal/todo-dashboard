import { todo } from "@/types/dashboard/todo";
import {mongoose} from "../../service/mongooseService";
import { signUpType } from "../../types/auth/signup";

const Schema = mongoose.Schema

const todoSchema = new Schema({
    TASKS: [
        {
          text: { type: String, required: true },
          id: { type: String, required: true, unique: true }
        }
      ],
      IN_PROGRESS: [
        {
          text: { type: String, required: true },
          id: { type: String, required: true, unique: true }
        }
      ],
      COMPLETED: [
        {
          text: { type: String, required: true },
          id: { type: String, required: true, unique: true }
        }
      ],
});

export const TodoModel = mongoose.model("todo",todoSchema);

export const getAllTodos = ()=>{
    return TodoModel.find();
}

export const updateTodo = (id:string,data:todo)=>{
    return TodoModel.findByIdAndUpdate({_id:id},data);
}


