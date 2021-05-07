import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { Incomplete } from "./components/Incomplete";
import { Complete } from "./components/Complete";

export const App = () => {
  /* 
  ============state============
 */
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  /* 
  ============関数============
 */
  //textarea入力時にstateを更新する関数
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  //追加ボタン押下時の処理
  const onClickAdd = () => {
    if (todoText === "") return;
    //移動処理
    moveContent(incompleteTodos, todoText, setIncompleteTodos);
    setTodoText("");
  };

  //削除ボタン押下時の処理
  const onClickDelete = (index) => {
    //削除処理
    deleteContent(index, incompleteTodos, setIncompleteTodos);
  };

  //完了ボタン押下時の処理
  const onClickComplete = (index) => {
    //削除処理
    deleteContent(index, incompleteTodos, setIncompleteTodos);
    //移動処理
    moveContent(completeTodos, incompleteTodos[index], setCompleteTodos);
  };

  //戻すボタン押下時の処理
  const onClickReturn = (index) => {
    //削除処理
    deleteContent(index, completeTodos, setCompleteTodos);
    //移動処理
    moveContent(incompleteTodos, completeTodos[index], setIncompleteTodos);
  };

  //削除処理の関数
  const deleteContent = (index, array, func) => {
    const newTodos = [...array];
    newTodos.splice(index, 1);
    func(newTodos);
  };

  //移動処理の関数
  const moveContent = (array, content, func) => {
    const newTodos = [...array, content];
    func(newTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTODO５個までだお。消化しよう～</p>
      )}
      <Incomplete
        incompleteTodos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <Complete completeTodos={completeTodos} onClick={onClickReturn} />
    </>
  );
};
