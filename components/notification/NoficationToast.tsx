import Image from "next/image";
import { toast } from "react-hot-toast";

interface IToastPros {
  t: any;
  success: boolean;
  msg: string;
}

function NotificationToast({ t, success, msg }: IToastPros) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Image
              className="h-10 w-10 rounded-full ring-2 ring-green-400"
              src="/assets/abir.jpg"
              alt="admin_img"
              width={30}
              height={30}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-gray-900 flex flex-col">
              <span>Abir Santra</span>
              <span
                style={{ fontSize: "10px" }}
                className=" text-gray-400 capitalize"
              >
                owner
              </span>
            </p>
            <p
              className={`mt-1 text-sm font-bold ${
                success ? "text-green-500" : " text-rose-500"
              }`}
            >
              {msg}
            </p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default NotificationToast;
