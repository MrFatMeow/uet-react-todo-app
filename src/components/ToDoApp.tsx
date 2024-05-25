import { Button, Input, Select, Tag } from "antd";
import { useState } from "react";
import { PriorityEnum, StatusEnum } from "../constants/enum.constants";
import { pripriorityOptions } from "../constants/options.constants";

interface IToDo {
  id: number;
  note: string;
  priority: PriorityEnum;
  status: StatusEnum;
}

export const ToDoApp = () => {
  const [listNote, setListNote] = useState<IToDo[]>([]);
  const [note, setNote] = useState("");
  const [priority, setPriority] = useState(PriorityEnum.LOW);
  const [status, setStatus] = useState(StatusEnum.TODO);

  const handleOnChange = (e: any) => {
    setNote(e.target.value);
  };

  const handleOnAddNew = () => {
    if (!note.trim()) return;
    const newNote: IToDo = {
      id: Date.now(),
      note: note,
      priority,
      status,
    };
    setListNote([newNote, ...listNote]);
    setNote("");
  };

  const handeOnDelete = (noteId: number) => {
    const tmp = listNote.filter((a: any) => a.id !== noteId);
    setListNote(tmp);
  };

  const handleOnKeydown = (e: any) => {
    if (e.key === "Enter") {
      if (note.length === 0) return;
      handleOnAddNew();
    }
  };

  return (
    <div className="h-screen bg-slate-100 py-10">
      <div className="max-w-[700px] mx-auto">
        <div>
          <div className="w-full flex gap-2">
            <Input
              value={note}
              onKeyDown={handleOnKeydown}
              onChange={handleOnChange}
              placeholder="Enter your note here"
            />
            {/* Cach định nghĩa trực tiếp các options của Select với thẻ Select.Option */}
            <Select value={status} onChange={(value) => setStatus(value)}>
              <Select.Option value={StatusEnum.TODO}>Todo</Select.Option>
              <Select.Option value={StatusEnum.DOING}>Doing</Select.Option>
              <Select.Option value={StatusEnum.DONE}>Done</Select.Option>
            </Select>

            {/* Cách sử dụng Select với 1 mảng với object với key và label - pripriorityOptions */}
            <Select
              value={priority}
              options={pripriorityOptions}
              onChange={(value) => setPriority(value)}
            />
            <Button type="primary" onClick={handleOnAddNew} disabled={note === ""}>
              Add new
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <ul className="flex flex-col gap-2">
            {listNote.map((a: IToDo) => {
              return (
                <li className="bg-white p-4 rounded-xl hover:border hover:shadow-lg">
                  <div className="flex justify-between">
                    <div className="flex justify-center gap-1">
                      <div className="flex">
                        <Tag color="#34495e">{a.status}</Tag>
                        <Tag color="#e74c3c">{a.priority}</Tag>
                      </div>
                      <span>{a.note} </span>
                    </div>
                    <Button
                      size="small"
                      danger
                      onClick={() => handeOnDelete(a.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
