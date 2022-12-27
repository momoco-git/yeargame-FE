import IO from '@utils/socket';
import useStore from '@utils/store/useStore';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2';
import { useObserver } from 'mobx-react';
import { useQuery } from 'react-query';
import { gameAPI } from '@utils/api';
import Image from 'next/image';

function GameRoom() {
  const { mobxstore } = useStore();
  const admin = mobxstore.currentUser;

  const router = useRouter();
  const gameMode = mobxstore.currentGame;
  const Desktop: boolean = useMediaQuery({ minWidth: 920 });
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const socket = useMemo(() => {
    return IO();
  }, []);

  const getContent = async () => {
    const res = await gameAPI.getContents();
    console.log(res.data);
    return res.data;
  };

  const ContentQuery = useQuery([gameMode], getContent, { refetchOnWindowFocus: false });

  const List = ContentQuery.data?.contents[1];
  console.log(List?.imageURL);
  useEffect(() => {}, []);
  socket.on('Answer', (data) => {
    console.log('받음', data);
    if (Desktop) {
      Swal.fire({
        toast: true,
        title: data[0],
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
  return useObserver(() => (
    <>
      {admin === 'admin' ? (
        <div className="flex flex-col space-y-4 justify-center items-center w-full h-full">
          <p>{gameMode}관리자</p>
          <div className="">
            <img src={List?.imageURL} alt="게임" width={300} />
          </div>
          <div>정답 목록</div>
          <button className="btn" onClick={clearAnswerList}>
            정답자 목록 비우기
          </button>
          <div className="flex space-x-4">
            <button className="btn">이전문제</button>
            <button className="btn">다음문제</button>
          </div>
          <p>점수 추가해주기</p>
          <div>
            <button className="btn">1</button>
            <button className="btn">2</button>
            <button className="btn">3</button>
          </div>
        </div>
      ) : Desktop ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <p>{gameMode}</p>{' '}
          <div>
            <div className="">
              <img src={List?.imageURL} alt="게임" width={300} height={300} />
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

export default GameRoom;
