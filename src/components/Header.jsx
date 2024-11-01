import headerImage from "../assets/header_img.jpg";

export function Header() {
  return (
    <>
    <header className="w-full pt-20 bg-[#f9f9f9]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between p-5">
        <div className="w-full grid gap-3 md:gap-6 md:grid-cols-2">
          <div>
            <div className="header-image">
              <img src={headerImage} alt="Header" className="rounded" />
            </div>
          </div>

          <div className="flex flex-col gap-2 text-black">
            <h2 className="font-semibold text-xl mb-5">
              ForkIt: Where Healthy Meets Tasty!
            </h2>

            <div>
              <p className="text-s whitespace-pre-line max-w-m md:max-w-xl mb-5">
                Discover a world of delicious and nutritious recipes tailored
                just for you! Whether you're looking to eat healthier, explore
                new flavors, or simply find quick meal ideas, we have got you
                covered. Our curated collection of wholesome recipes is designed
                to inspire your culinary journey, making healthy eating
                enjoyable and accessible. <br/>
              </p>
              <span className="font-semibold text-lg">Happy cooking!</span>
            </div>
          </div>
        </div>
      </div>
      </header>
    </>
  );
}
export default Header;
