import React from "react";

export const Complete = (props) => {
  const { completeTodos, onClick } = props;
  return (
    <div className="complete-area">
      <div>
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClick(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
