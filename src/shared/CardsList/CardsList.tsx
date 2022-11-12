import React, { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import styles from './cardslist.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';

import { bestRequestAsync } from '../../store/bestPosts/actions';
import { BestState } from '../../store/bestPosts/reducer';
import { risingRequestAsync } from '../../store/risingPosts/actions';
import { RisingState } from '../../store/risingPosts/reducer';

export function CardsList() {
  const token = useSelector<RootState, string>(state => state.token.token);
  const bottomOfList = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  // BestPost
  const { bestLoading, bestData, bestError } = useSelector<RootState, BestState>(state => state.bestPosts);
  const [countBestLoad, setCountBestLoad] = useState<number>(0);

  function bestHandleClick() {
    setCountBestLoad(1);
    dispatch<any>(bestRequestAsync(bestData.after));
  };

  useEffect(() => {
    if (!token || token === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && countBestLoad < 2) {
        dispatch<any>(bestRequestAsync(bestData.after));
        setCountBestLoad(countBestLoad + 1);
      }
    }, { rootMargin: '100px' });

    if (bottomOfList.current) observer.observe(bottomOfList.current);

    return () => {
      if (bottomOfList.current) observer.unobserve(bottomOfList.current);
    };
  }, [bottomOfList.current, bestData.after, token]);

  // Rising
  // const { risingLoading, risingData, risingError } = useSelector<RootState, RisingState>(state => state.risingPosts);
  // const [countRisingLoad, setCountRisingLoad] = useState<number>(0);

  // function risingHandleClick() {
  //   setCountRisingLoad(1);
  //   dispatch<any>(risingRequestAsync(risingData.after));
  // };

  // useEffect(() => {
  //   if (!token || token === 'undefined') return;

  //   const observer = new IntersectionObserver((entries) => {

  //     if (entries[0].isIntersecting && countRisingLoad < 2) {
  //       dispatch<any>(risingRequestAsync(risingData.after));
  //       setCountRisingLoad(countRisingLoad + 1);
  //     }
  //   }, { rootMargin: '100px' });

  //   if (bottomOfList.current) observer.observe(bottomOfList.current);

  //   return () => {
  //     if (bottomOfList.current) observer.unobserve(bottomOfList.current);
  //   };
  // }, [bottomOfList.current, risingData.after, token]);

  return (
    <ul className={styles.cardsList}>
      {/* BestPost */}
      {token && token !== 'undefined' && (
        <div>
          {bestData.data?.length === 0 && !bestLoading && !bestError && (
            <div style={{ textAlign: 'center' }}>Oops, no posts...</div>
          )}

          {bestData.data?.map((post) => <Card key={post.postId} post={post} />)}

          {bestLoading && (
            <div style={{ textAlign: 'center' }}>Loading...</div>
          )}

          {(countBestLoad === 2) && !bestLoading && (
            <button className={styles.loadMore} onClick={bestHandleClick}>Load more</button>
          )}

          {bestError && (
            <div role="alert" style={{ textAlign: 'center' }}>{bestError}</div>
          )}
        </div>
      )}

      {/* Rising */}
      {/* { token && token !== 'undefined' && (
        <div>
          {risingData.data?.length === 0 && !risingLoading && !risingError && (
            <div style={{ textAlign: 'center' }}>Oops, no posts...</div>
          )}

          {risingData.data?.map((post) => <Card key={post.postId} post={post} />)}

          {risingLoading && (
            <div style={{ textAlign: 'center' }}>Loading...</div>
          )}

          {(countRisingLoad === 2) && !risingLoading && (
            <button className={styles.loadMore} onClick={risingHandleClick}>Load more</button>
          )}

          {risingError && (
            <div role="alert" style={{ textAlign: 'center' }}>{risingError}</div>
          )}
        </div>
      )} */}

      <div ref={bottomOfList} />
    </ul>
  );
}
