import React,{useCallback, useContext} from 'react';
import { OPEN_CELL, TableContext,CLICK_MINE,FLAG_CELL,QUESTION_CELL,NORMALIZE_CELL } from './MineSearch';
import { CODE } from './MineSearch';

const getTdStyle = (code) =>{
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
          return {
            background: '#444',
          };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
          return {
            background: 'white',
          };
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          return {
            background: 'yellow',
          };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          return {
            background: 'red',
          };
        default:
          return {
            background: 'white',
          };
      }
};

const getTdtext = (code) =>{
    console.log('getTdtext');
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return code || '';
  }
};

const Td = ({rowIndex, cellIndex}) =>{
    const {tableData,dispatch,halted} = useContext(TableContext);
    const onClickTd = useCallback(() => {
      if(halted){
        return;
      }
      switch(tableData[rowIndex][cellIndex]){
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
        case CODE.FLAG:
        case CODE.OPENED:
          return;
        case CODE.NORMAL:
          dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
          return;
        case CODE.MINE:
          dispatch({type: CLICK_MINE, row: rowIndex, cell : cellIndex});
          return;
      }
    },[tableData[rowIndex][cellIndex],halted]);
    const onRightClickTd = useCallback((e)=>{
      e.preventDefault();
      if(halted){
        return;
      }
      switch(tableData[rowIndex][cellIndex]){
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({type : FLAG_CELL, row: rowIndex, cell: cellIndex});
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({type: QUESTION_CELL,row: rowIndex, cell: cellIndex});
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({type:NORMALIZE_CELL,row:rowIndex,cell:cellIndex});
          return;
        default:
          return;
      }
    },[tableData[rowIndex][cellIndex],halted]);

    return(
        <td 
        style = {getTdStyle(tableData[rowIndex][cellIndex])}
        onClick = {onClickTd}
        onContextMenu = {onRightClickTd}
        >
           {getTdtext(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;