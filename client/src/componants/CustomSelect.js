import Select from "react-select";

const CustomSelect = ({ albums, setSubfolderName }) => {
  const options = albums.map((album) => ({
    value: album.title,
    label: (
      <div className="flex items-center">
        <img
          src={album.album[0]}
          alt={album.title}
          className="w-10 h-10 mr-2"
        />
        <p className="text-lg">{album.title}</p>
      </div>
    ),
  }));

  const handleChange = (selectedOption) => {
    setSubfolderName(selectedOption.value);
  };

  return (
    <Select
      className="border-2 border-black"
      options={options}
      onChange={handleChange}
    />
  );
};

export default CustomSelect;
