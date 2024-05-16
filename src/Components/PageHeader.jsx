/* eslint-disable react/prop-types */

const PageHeader = ({ pageTitle }) => {
  return (
    <div>
      <div className="mx-auto my-[32px] shadow-lg shadow-gray-100">
        <div className="flex justify-center items-center h-[200px] bg-[url('/page-title-banner.jpg')] bg-no-repeat bg-cover bg-center  p-4 rounded-lg text-center">
          <p className="inline-block text-white text-[36px] font-bold">{pageTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
