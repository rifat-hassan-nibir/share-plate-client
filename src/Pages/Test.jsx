const Test = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };
  return (
    <div>
      <h1>This is test page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Test;
