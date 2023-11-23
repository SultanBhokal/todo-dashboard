export type columnObject = {
    text: string,
    id: string,
    _id?:string
  }



export type todo = {
    [key:string]:columnObject[]| [],
    "COMPLETED": columnObject[] | [],
    "IN_PROGRESS":columnObject[] | [],
    "TASKS":columnObject[] | [],
}

