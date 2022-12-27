import React, { useMemo, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import IO from '@utils/socket';
import { useRouter } from 'next/router';
import useStore from '@utils/store/useStore';
import { useObserver } from 'mobx-react';
import { useMediaQuery } from 'react-responsive';

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
    socket.emit('game_in', e.target.id);
    mobxstore.setgame(e.target.id);
  };
  socket.on('game_ready', (data) => {
    console.log('받음', data, router.pathname);
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
  return useObserver(() => (
    <>
      {Desktop ? (
        <>
          <div className="flex w-full h-1/3 justify-center items-center ">
            <p className="font-bold text-3xl"> 게임을 선택해주세요</p>
          </div>
          <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              numberOfCards={3}
              gutter={20}
              leftChevron={<button type="button">{'<'}</button>}
              rightChevron={<button type="button">{'>'}</button>}
              outsideChevron
              chevronWidth={chevronWidth}>
              {mobxstore.gamelist.map((game, idx) => {
                return (
                  <div
                    id={game}
                    key={idx}
                    onClick={(e) => {
                      ToGame(e);
                    }}
                    style={{ height: 300, background: '#EEE' }}>
                    {game}
                  </div>
                );
              })}
            </ItemsCarousel>
          </div>
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
