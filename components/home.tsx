import IO from '@utils/socket';
import { useRouter } from 'next/router';
import { FormEvent, useMemo, useRef, useState } from 'react';

export default function Home() {
  const router = useRouter();

  const socket = useMemo(() => {
    return IO();
  }, []);
  const teamRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (teamRef.current) {
      socket.emit('join_game', { data: teamRef.current.value });
      router.push(`/waitroom`);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center  h-screen w-full">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="flex flex-col space-y-4">
            {/* item */}
            <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">당신의 팀이름은?</h1>
                </div>

                <div className="mt-5">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-bold ml-1 mb-2 dark:text-white text-center">
                          어디 팀인지 적어주세요
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                            ref={teamRef}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                        Reset password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
