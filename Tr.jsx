import React,{useContext} from 'react';
import { TableContext } from './MineSearch';
import Td from './Td';

const Tr = ({rowIndex}) =>{
    const{tableData} = useContext(TableContext);
    return(
        <tbody>
             <tr>
                {tableData[0] && Array(tableData[0].length).fill().map((tr,i) => 
                <Td rowIndex = {rowIndex} cellIndex = {i}/>)}
            </tr>
         </tbody>
      )
};

export default Tr;