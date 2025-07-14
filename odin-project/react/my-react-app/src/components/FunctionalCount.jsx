import { useState } from 'react'

export default function FunctionalCount(props) {
  return (
    <div>
      There are <b>{props.taskCount}</b> current tasks
    </div>
  )

}