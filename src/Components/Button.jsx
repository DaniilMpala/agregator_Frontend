import "./Style/Button.scss";
import { useState, useEffect } from "react";

//если дропСписок то массив пишем
export default function Button({
  children,
  onClick = () => {},
  dropdown = false,
  className,
  onChange = () => {},
  setValue = () =>{}
}) {
  const [Class, setClass] = useState("");
  const [textChanged, settextChanged] = useState(children[0].html);

  console.log(dropdown ? textChanged : children)
  return (
    <but>
      <button
        className={className}
        onClick={
          dropdown
            ? (e) => (Class ? setClass("") : setClass("active"))
            : onClick
        }
        dangerouslySetInnerHTML={{ __html:(dropdown ? textChanged : children)+(dropdown ? '<img src="drop.svg" />' : "")}}
      />
      {dropdown ? (
        <div className={"dropdown " + Class}>
          {children.map((v, i) =>
            textChanged == v ? (
              ""
            ) : (
              <button
                onClick={(e) => {
                  setClass("")
                  setValue(v.v)
                  settextChanged(e.target.innerHTML);
                }}
                dangerouslySetInnerHTML={{ __html:v.html}}
              />
            )
          )}
        </div>
      ) : (
        ""
      )}
    </but>
  );
}
