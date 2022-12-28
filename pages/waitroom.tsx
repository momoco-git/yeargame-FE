/* eslint-disable no-console */
import React, { useMemo, useState } from 'react';
import IO from '@utils/socket';
import { useRouter } from 'next/router';
import useStore from '@utils/store/useStore';
import { useObserver } from 'mobx-react';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WaitRoom = () => {
  const Desktop: boolean = useMediaQuery({ minWidth: 920 });

  const { mobxstore } = useStore();
  console.log(mobxstore.currentUser);
  const router = useRouter();
  const socket = useMemo(() => {
    return IO();
  }, []);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const ToGame = (e: any) => {
    console.log(e);
    socket.emit('game_in', e.target.id);
    mobxstore.setgame(e.target.id);
  };
  socket.on('game_ready', (data) => {
    console.log('받음', data, router.pathname);
    mobxstore.setgame(data);
    if (!(router.pathname === '/waitroom')) {
      console.log('여기는 다른곳');
      return;
    }
    switch (data) {
      case '인물사진게임':
        router.push(`/game/human`);
        break;

      default:
        break;
    }
    // router.push(`/game/${data}`);
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return useObserver(() => (
    <>
      {Desktop ? (
        <>
          <div className="flex w-full h-1/3 justify-center items-center ">
            <p className="font-bold text-3xl"> 게임을 선택해주세요</p>
          </div>
          <Slider {...settings}>
            <div>
              <button className="w-full h-1/3 flex justify-center items-center">
                <img
                  src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRVFdmpZNGftstd93HpVQ9euoXauL2rmPDm02eIGSC6gh31jXIp35VNWfExDEw4GUNb2kfpn-uEcQ&usqp=CAc "
                  alt="asd"
                />
              </button>
            </div>
            <div className="">
              <div
                id="인물사진게임"
                onClick={(e) => {
                  ToGame(e);
                }}
                className="w-full btn flex justify-center items-center ">
                <div>2</div>
              </div>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
          {/* {mobxstore.gamelist.map((game, idx) => {
                  return (
                    <div
                      id={game}
                      key={idx}
                      onClick={(e) => {
                        ToGame(e);
                      }}>
                      {game}
                    </div>
                  );
                })} */}
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-2xl font-bold">게임준비중입니다...</p>
        </div>
      )}
    </>
  ));
};
export default WaitRoom;
