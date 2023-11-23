type columnObject = {
    text: string,
    styleType: number,
    id: string
  }


export type todo = {
    [key: string]: columnObject[];
}

export type reqBodyTodo = {
  id:string,
  todos:{
    [key: string]: columnObject[];
  }
}