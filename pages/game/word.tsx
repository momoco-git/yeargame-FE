import IO from '@utils/socket';
import useStore from '@utils/store/useStore';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2';
import { useObserver } from 'mobx-react';
import { useQuery } from 'react-query';
import { gameAPI } from '@utils/api';
import Image from 'next/image';

function WordGame() {
  const { mobxstore } = useStore();
  const admin = mobxstore.currentUser;
  const userRef = useRef<string[]>([]);
  const router = useRouter();
  const gameMode = mobxstore.currentGame;
  const Desktop: boolean = useMediaQuery({ minWidth: 920 });
  const [ItemIndex, setItemIndex] = useState(0);
  const socket = useMemo(() => {
    return IO();
  }, []);

  const getContent = async () => {
    const res = await gameAPI.getWord();
    console.log(res.data);
    return res.data;
  };

  const ContentQuery = useQuery([gameMode], getContent, { refetchOnWindowFocus: false });

  const List = ContentQuery.data?.contents[0];
  console.log(List);
  const userList = () => {
    if (admin !== 'admin') {
      socket.emit('getUserList', admin);
    }
  };

  useEffect(() => {
    userList();
  }, []);
  socket.on('getUserList', (data: string[]) => {
    userRef.current = data;
    return;
  });
  socket.on('Answer', (data) => {
    console.log('받음', data);
    if (Desktop) {
      Swal.fire({
        toast: true,
        title: data,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
    }
    return IO().disconnect();
  });
  const sendAnswer = () => {
    socket.emit('Answer', mobxstore.currentUser);
  };
  const clearAnswerList = () => {
    socket.emit('clearList');
  };
  const nextQuiz = () => {
    const randomNum = ItemIndex + 1;
    // Math.floor(Math.random() * 46) + 1;
    socket.emit('nextItem', randomNum);
  };
  const prevQuiz = () => {
    const randomNum = ItemIndex - 1;
    // Math.floor(Math.random() * 46) + 1;
    socket.emit('prevItem', randomNum);
  };
  socket.on('nextItem', (data) => {
    setItemIndex(data);
  });
  socket.on('prevItem', (data) => {
    setItemIndex(data);
  });
  return useObserver(() => (
    <>
      {admin === 'admin' ? (
        <div className="flex flex-col space-y-4 justify-center items-center w-full h-full">
          <p>{gameMode}관리자</p>

          <div>정답 목록</div>
          <div className="">{List?.answer}</div>
          <button className="btn" onClick={clearAnswerList}>
            정답자 목록 비우기
          </button>
          <div className="flex space-x-4">
            <button className="btn" onClick={prevQuiz}>
              이전문제
            </button>
            <button className="btn" onClick={nextQuiz}>
              다음문제
            </button>
          </div>
          <p>점수 추가해주기</p>
          <div className="flex space-x-3">
            {userRef.current.map((user, idx) => {
              return (
                <button key={idx} id={user} className="btn">
                  {user}
                </button>
              );
            })}
          </div>
        </div>
      ) : Desktop ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p>{gameMode}</p> <p>{ItemIndex}번 문제</p>
          <div>
            <div className="">
              <p>{List?.quiz[ItemIndex]}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p className="text-2xl pb-4">{gameMode}</p>
          <button type="button" className="btn bg-primary w-1/2 h-1/5 " onClick={sendAnswer}>
            <span className="text-[10vw]">정답</span>
          </button>
        </div>
      )}
    </>
  ));
}

export default WordGame;
