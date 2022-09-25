import React,{useContext} from 'react';
import { TableContext } from './MineSearch';
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
    const {tableData} = useContext(TableContext);
    return(
        <td style = {getTdStyle(tableData[rowIndex][cellIndex])}>
            {getTdtext(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;