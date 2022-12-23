import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

const WaitRoom = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <>
      <div className="flex w-full h-1/3 justify-center items-center ">
        <p className="font-bold text-3xl"> 게임을 선택해주세요</p>
      </div>
      <div style={{ padding: `0 ${chevronWidth}px` }}>
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={2}
          gutter={20}
          leftChevron={<button>{'<'}</button>}
          rightChevron={<button>{'>'}</button>}
          outsideChevron
          chevronWidth={chevronWidth}>
          <div style={{ height: 200, background: '#EEE' }}>First card</div>
          <div style={{ height: 200, background: '#EEE' }}>Second card</div>
          <div style={{ height: 200, background: '#EEE' }}>Third card</div>
          <div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
        </ItemsCarousel>
      </div>
    </>
  );
};
export default WaitRoom;
