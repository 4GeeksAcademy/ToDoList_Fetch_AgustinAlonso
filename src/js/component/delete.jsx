import React from "react";

const Delete = ({ taskKey, getList }) => {

    const eliminar = () => {
        console.log('Inició el fetch de Delete')
        fetch(`https://playground.4geeks.com/todo/todos/${taskKey}`, {
            method: 'DELETE'
        }).then((res) => {
            console.log(`staus:`, res.status)

            getList()
        })
        console.log('Finalizó el fetch de Delete')
    }
    return (
        <span onClick={eliminar}>❌</span>
    )
}

export default Delete;