import classNames from 'classnames';
import { pinyin } from 'pinyin-pro';
import { useMemo } from 'react';

type Props = {
  value: string;
};

export default function Sentence({ value }: Props) {
  const wordSegmenter = useMemo(
    () =>
      // @ts-ignore
      new Intl.Segmenter('cn', { granularity: 'word' }),
    []
  );
  const colors = useMemo(
    () => [
      'text-red-600',
      'text-blue-600',
      'text-indigo-600',
      'text-orange-600',
      'text-cyan-600',
      'text-amber-600',
      'text-sky-600',
      'text-violet-600',
      'text-lime-600',
      'text-emerald-600',
      'text-green-600',
      'text-teal-600',
      'text-purple-600',
      'text-fuchsia-600',
      'text-pink-600',
    ],
    []
  );
  const content = useMemo(() => {
    const words = wordSegmenter.segment(value);
    const colorCache: Record<string, string> = {};
    let index = 0;
    const result = [];
    for (let item of words) {
      if (item.segment.length >= 2) {
        if (!colorCache[item.segment]) {
          colorCache[item.segment] = colors[index++];
          if (index >= colors.length) {
            index = 0;
          }
        }
      }
      result.push(
        item.isWordLike ? (
          <span
            key={item.index}
            className={classNames('inline-flex flex-col px-1', {
              [colorCache[item.segment]]: item.segment.length >= 2,
            })}
          >
            <span
              className={classNames(
                'flex justify-evenly font-serif text-base',
                {
                  'flex justify-evenly font-serif text-gray-500':
                    item.segment.length == 1,
                }
              )}
            >
              {pinyin(item.segment)}
            </span>
            <span className="flex justify-evenly font-bold text-lg">
              {item.segment.split('').map((val: string, i: number) => (
                <span key={i}>{val}</span>
              ))}
            </span>
          </span>
        ) : item.segment == '\n' ? (
          <br key={item.index} />
        ) : (
          <span key={item.index} className="font-bold text-black align-bottom">
            {item.segment}
          </span>
        )
      );
    }
    return result;
  }, [value, colors]);

  return <>{content}</>;
}
