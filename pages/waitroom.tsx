import React, { useMemo, useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import IO from '@utils/socket';
import { useRouter } from 'next/router';

const WaitRoom = () => {
  const router = useRouter();
  const socket = useMemo(() => {
    return IO();
  }, []);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const ToGame = (e: any) => {
    socket.emit('game_in', e.target.id);
  };
  socket.on('game_ready', (data) => {
    console.log('받음', data);
    router.push(`gameroom/${data}`);
  });
  return (
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
          rightChevron={<button>{'>'}</button>}
          outsideChevron
          chevronWidth={chevronWidth}>
          <div
            id="초성게임"
            onClick={(e) => {
              ToGame(e);
            }}
            style={{ height: 300, background: '#EEE' }}>
            First card
          </div>
          <div style={{ height: 300, background: '#EEE' }}>Second card</div>
          <div style={{ height: 300, background: '#EEE' }}>Third card</div>
          <div style={{ height: 300, background: '#EEE' }}>Fourth card</div>
        </ItemsCarousel>
      </div>
    </>
  );
};
export default WaitRoom;
