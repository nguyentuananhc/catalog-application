function Header() {
  return (
    <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
      <div className="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row ">
        <div className="flex flex-row items-center justify-between py-6">
          <div className="flex items-center">
            <img
              className="w-10 h-10 mr-2"
              src={
                "https://scontent.fhph1-2.fna.fbcdn.net/v/t1.6435-1/p148x148/132004959_1090857041376299_5487220852260434102_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=1eb0c7&_nc_ohc=xDuiNPTXiusAX_w1aSj&_nc_ht=scontent.fhph1-2.fna&tp=6&oh=da31077db5aa482830b84f9b97d349ff&oe=60C2B65C"
              }
              alt="logo"
            />
            <a
              href="/"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              Matthew Computer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
