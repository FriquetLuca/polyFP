const segmenter: Intl.Segmenter | null =
  typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null;

export function* iterate(str: string): Generator<string> {
  if (segmenter !== null) {
    for (const { segment } of segmenter.segment(str)) {
      yield segment;
    }
  } else {
    yield* str;
  }
}
