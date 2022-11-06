import react, { createContext } from "react";
//is file ko humne simply export krne ke hai bss rakha hai tomake the code clean

const noteContext= createContext();//it will hold all the states of all the components.... and hum kisi bhi components mai use kr paaenge NoteState ki cheeze

export default noteContext;

