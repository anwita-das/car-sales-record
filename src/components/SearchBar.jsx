function SearchBar({searchTerm , setSearchTerm, onSearch}) {
    return(
        <div className="flex justify-center w-[400px] sm:w-[60%] h-[40px]">
            <input type="text" placeholder="Search for cars..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full text-base border-none rounded-l-full px-2 bg-white" />
            <button type="button" className="bg-[#ffe600] border-none w-[100px] rounded-r-full hover:bg-[#ffb300] cursor-pointer" onClick={onSearch}>Search</button>
        </div>
    );
}

export default SearchBar;