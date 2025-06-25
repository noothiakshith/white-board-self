import { nanoid } from "nanoid";
import { create } from "zustand";

const useWhiteBoardStore = create((set,get)=>({
    elements:[],
    currenttool:'line',
    storkecolor:'#00000000000',
    fillcolor:'transparent',
    brushsize:0,
    history:[[]],
    historypointer:0,
    isDrawing:false,
    selectedElement:null,
    settool:(tool)=>((set)=>({
        currenttool:tool
    })),
    setstorkecolor:(color)=>((set)=>({
        storkecolor:color
    })),
    setfillcolor:(color)=>((set)=>({
        fillcolor:color
    })),
    setbrushsize:(size)=>((set)=>({
        brushsize:size
    })),
    addelement:(element)=>((set)=>({
        elements:[...state.elements,{...element,id:nanoid()}]
    })),
    removeelement:(id)=>((set)=>({
        elements:state.elements.filter((el)=>el.id!==id)
    })),
    updateelement:(id,updatedone)=>{
        let check = state.elements.find((el)=>el.id===id);
        if(check){
            return{
                elements:[...state.elements,updatedone]
            }
        }
        else{
            return{

            }
        }
    },
    pushtohistory:()=>{
        const newhistory = state.history.slice(0,state.historypointer+1);
        return{
            history:[...state.history,newhistory],
            historypointer:newhistory.length
        }
    },
    undo:()=>{
        if(state.historypointer>0){
            const newpointer = state.historypointer-1;
            return{
                elements:state.history[newpointer],
                historypointer:newpointer
            }
        }
        else{
            return{}
        }
    },
    redo:()=>{
        if(state.historypointer<state.history.length-1){
            const newpointer = state.historypointer+1;
            return{
                elements:state.history[newpointer],
                historypointer:newpointer,
            }
        }
        else{
            return{}
        }
    },
    clearcanvas:()=>{
        set({ elements: [] });
      get().pushToHistory();
    },
    setisdrawing:(value)=>((set)=>({
         isDrawing:value
    })),
    setselected:(element)=>((set)=>({
        selectedElement:element
    }))

}))

export default useWhiteBoardStore