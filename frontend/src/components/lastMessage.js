"use client"

//props
export default function LastMessage(props) {
  if (!props.group) {
    return (
      <h5>{props.content}</h5>
    );
  }

    return (
      <h5> {props.user}: {props.content}</h5>
    );
  };
  