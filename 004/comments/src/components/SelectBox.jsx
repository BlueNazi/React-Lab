import { useEffect, useState } from "react";

function SelectBox() {
  const [topics, setTopics] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      fetch(`http://127.0.0.1:8000/?search=${search}`)
        .then((response) => response.json())
        .then((data) => {
          setTopics(data.data.matchedTechs || []);
          setIsOpen(data.data.matchedTechs.length > 0);
        });
    } else {
      setIsOpen(false);
      setTopics([]);
    }
  }, [search]);

  const selectTopic = (name) => {
    setSearch(name);
    setIsOpen(false);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".c-box")) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const closeStyle = {
    padding: 0,
    height: 0,
    overflow: "hidden",
  };

  const openStyle = {
    padding: "10px",
    height: "auto",
    overflow: "auto",
  };

  return (
    <div className="c-box">
      <input
        className="tpc"
        placeholder="topic"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="c-selectbox" style={isOpen ? openStyle : closeStyle}>
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="item"
            onClick={() => selectTopic(topic.name)}
          >
            <label htmlFor={topic.id}>{topic.name}</label>
            <input type="radio" name="topic" id={topic.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectBox;
