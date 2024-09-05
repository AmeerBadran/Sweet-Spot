import SocialLinks from "../molecule/SocialLinks";
export default function Footer() {
  return (
    <div>
      <footer className="pb-4 w-full bg-zinc-200">
        <div className="flex border-t border-gray-500 mt-4 pt-6 text-center justify-center">
          <p className="text-gray-700 ">Sweet Spot 2024 © All rights reserved.</p>
          <SocialLinks />
        </div>
      </footer>
    </div>

  )
}
