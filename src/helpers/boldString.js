export function boldString(input, wordsToBold) {
  return input.replace(
    new RegExp("(\\b)(" + wordsToBold.join("|") + ")(\\b)", "i"),
    "$1<b>$2</b>$3"
  );
}
