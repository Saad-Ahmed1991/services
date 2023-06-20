import Select from "react-select";

const CustomSelect = ({ albums, setAlbumName }) => {
  const options = albums.map((album) => ({
    value: album.title,
    label: (
      <div className="flex items-center">
        <img src={album.album[0]} alt={album.title} className="w-6 h-6 mr-2" />
        {album.title}
      </div>
    ),
  }));

  const handleChange = (selectedOption) => {
    setAlbumName(selectedOption.value);
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
