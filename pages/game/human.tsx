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

function HumanGame() {
  const { mobxstore } = useStore();
  const admin = mobxstore.currentUser;
  const [user, setuser] = useState<string[]>([]);
  const router = useRouter();
  const gameMode = mobxstore.currentGame;
  const Desktop: boolean = useMediaQuery({ minWidth: 920 });
  const [ItemIndex, setItemIndex] = useState(0);
  const socket = useMemo(() => {
    return IO();
  }, []);

  const getContent = async () => {
    const res = await gameAPI.getContents();
    console.log(res.data);
    return res.data;
  };

  const ContentQuery = useQuery([gameMode], getContent, { refetchOnWindowFocus: false });
  const List = ContentQuery.data?.contents[ItemIndex];
  const userList = () => {
    if (admin !== 'admin') {
      socket.emit('getUserList', admin);
    }
  };
  console.log(List?.imageURL);
  useEffect(() => {
    userList();
  }, []);
  socket.on('getUserList', (data: string[]) => {
    setuser(data);
    return;
  });
  const [answerList, setanswerList] = useState<string[]>([]);
  console.log(answerList);
  socket.on('Answer', async (data) => {
    console.log('받음', data);
    await setanswerList(data);

    // if (Desktop) {
    //   Swal.fire({
    //     toast: true,
    //     title: data,
    //     position: 'top',
    //     showConfirmButton: false,
    //     timer: 2500,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //       toast.addEventListener('mouseenter', Swal.stopTimer);
    //       toast.addEventListener('mouseleave', Swal.resumeTimer);
    //     },
    //   });
    // }
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
  const [disable, setdisable] = useState(false);
  const answerToggle = () => {
    socket.emit('answerToggle');
  };
  socket.on('answerToggle', () => {
    setdisable(!disable);
  });
  const userClear = () => {
    socket.emit('userClear');
  };
  socket.on('userClear', () => {
    setuser([]);
  });
  const plusScore = (data: string) => {
    socket.emit('plusScore', data);
  };
  const [score, setscore] = useState<object[]>([]);
  socket.on('plusScore', (data) => {
    setscore(data);
    console.log('스코어', score);
  });
  const goMenu = () => {
    socket.emit('goMenu');
  };
  socket.on('goMenu', () => {
    router.push('waitroom');
  });
  return useObserver(() => (
    <>
      {admin === 'admin' ? (
        <div className="flex flex-col space-y-4 justify-center items-center w-full h-full">
          <p>{gameMode}관리자</p>
          <button className="btn btn-accent" onClick={goMenu}>
            게임선택창으로
          </button>
          <div>정답 목록</div>
          <div className="">{List?.answer}</div>
          <button className="btn btn-primary" onClick={clearAnswerList}>
            정답자 목록 비우기
          </button>
          <button className="btn-secondary btn" onClick={answerToggle}>
            정답버튼 비/활성화
          </button>
          <div className="flex space-x-4">
            <button className="btn" onClick={prevQuiz}>
              이전문제
            </button>
            <button className="btn" onClick={nextQuiz}>
              다음문제
            </button>
          </div>
          <div className="btn" onClick={userClear}>
            유저목록 초기화
          </div>
          <p>점수 추가해주기</p>
          <div className="flex space-x-3">
            {user.map((user, idx) => {
              return (
                <button
                  key={idx}
                  id={user}
                  onClick={() => {
                    plusScore(user);
                  }}
                  className="btn">
                  {user}
                </button>
              );
            })}
          </div>
        </div>
      ) : Desktop ? (
        <>
          <div className="absolute top-0 left-0 w-full h-1/5 flex justify-center items-center ">
            <div className="bg-orange-300 rounded-lg w-1/3 h-1/2 flex justify-center items-center flex-col">
              <p>누른 순서</p>
              <div className="flex  justify-center items-center space-x-3">
                {answerList?.map((user, idx) => {
                  return (
                    <p className="btn-secondary font-new-font rounded-lg w-auto p-1" key={idx}>
                      {user}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full h-full">
            <p>{gameMode}</p> <p>{ItemIndex}번 문제</p>
            <div>
              <div className="">
                <img src={List?.imageURL} alt="게임" className="w-1/3 m-auto" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p className="text-2xl pb-4">{gameMode}</p>
          <button type="button" disabled={disable} className="btn bg-primary w-1/2 h-1/5 " onClick={sendAnswer}>
            <span className="text-[10vw]">정답</span>
          </button>
        </div>
      )}
    </>
  ));
}

export default HumanGame;
