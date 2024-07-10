import React from "react";
import Delete from "./delete";


const Tasks = ({getList, tasksList}) => {
    return (
        <ul className="list-group">
            {tasksList.map((element, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">{element.label}<Delete taskKey={element.id} getList={getList}/></li>
            ))}
        </ul>
    )
}

export default Tasks;