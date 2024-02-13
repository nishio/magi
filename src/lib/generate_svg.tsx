import { Discussion } from "@/lib/data";
import { takeOpinion } from "@/lib/takeOpinion";

function wrapText(textElement: SVGTextElement, text: string, maxWidth: number) {
  const words = text.split(" ");
  let line = "";
  const lineHeight = 1.2; // ems
  let y = textElement.getAttribute("y")!;

  words.forEach((word: string) => {
    const testLine = line + word + " ";
    textElement.textContent = testLine;
    const lineWidth = textElement.getComputedTextLength();

    if (lineWidth > maxWidth && line !== "") {
      const tspanElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "tspan"
      );
      tspanElement.setAttribute("x", textElement.getAttribute("x")!);
      tspanElement.setAttribute("y", y);
      tspanElement.textContent = line;
      textElement.appendChild(tspanElement);

      line = word + " ";
      y = parseFloat(y) + lineHeight + "em"; // Adjust line position
    } else {
      line = testLine;
    }
  });

  // Add the last line
  const tspanElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "tspan"
  );
  tspanElement.setAttribute("x", textElement.getAttribute("x")!);
  tspanElement.setAttribute("y", y);
  tspanElement.textContent = line;
  textElement.appendChild(tspanElement);
}

export const generate_svg = (discussion: Discussion) => {
  // const promptTextElement = (<text></text>) as SVGTextElement;

  // promptTextElement.setAttribute("x", "0");
  // promptTextElement.setAttribute("y", "0");
  // wrapText(promptTextElement, `PROMPT: ${discussion.topic}`, 150);
  // const prompt = promptTextElement;

  // const prompt = null;

  const vs = discussion.viewpoints.map((v) => takeOpinion(v.text).v);

  const jalabel = vs.map((v) => v_to_jalabel(v));

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1200"
      height="630"
      viewBox="0 0 1200 630"
      id="ogp-image"
    >
      <defs>
        <linearGradient
          id="positive"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#66fdce" />
          <stop offset="1" stop-color="#63d0f9" />
        </linearGradient>
        <linearGradient
          id="neutral"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#c4c4c4" />
          <stop offset="1" stop-color="gray" />
        </linearGradient>
        <linearGradient
          id="negative"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="#ff6301" />
          <stop offset="1" stop-color="#fb0801" />
        </linearGradient>
        <linearGradient
          id="error"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stop-color="gray" />
          <stop offset="1" stop-color="gray" />
        </linearGradient>
        <filter
          id="否定"
          x="463.595"
          y="500.095"
          width="110"
          height="70"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feFlood flood-opacity="0.302" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="中立"
          x="141.655"
          y="500.095"
          width="110"
          height="70"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="5" result="blur-2" />
          <feFlood flood-opacity="0.302" />
          <feComposite operator="in" in2="blur-2" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="承認"
          x="304"
          y="242"
          width="110"
          height="70"
          filterUnits="userSpaceOnUse"
        >
          <feOffset in="SourceAlpha" />
          <feGaussianBlur stdDeviation="5" result="blur-3" />
          <feFlood flood-opacity="0.302" />
          <feComposite operator="in" in2="blur-3" />
          <feComposite in="SourceGraphic" />
        </filter>
        <filter
          id="承認-2"
          x="304"
          y="242"
          width="110"
          height="70"
          filterUnits="userSpaceOnUse"
        >
          <feOffset dy="3" in="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur-4" />
          <feFlood flood-opacity="0.161" result="color" />
          <feComposite operator="out" in="SourceGraphic" in2="blur-4" />
          <feComposite operator="in" in="color" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
        <clipPath id="clip-アートボード_2">
          <rect width="1200" height="630" />
        </clipPath>
      </defs>
      <g
        id="アートボード_2"
        data-name="アートボード – 2"
        clip-path="url(#clip-アートボード_2)"
      >
        <rect width="1200" height="630" />
        {/* {PROMPT_BOX(discussion)} */}
        <path
          id="楕円形_1"
          data-name="楕円形 1"
          d="M110,30a80,80,0,1,0,80,80,80.091,80.091,0,0,0-80-80m0-30A110,110,0,1,1,0,110,110,110,0,0,1,110,0Z"
          transform="translate(248 223)"
          fill="#ff8902"
        />
        {TOP_UNIT(discussion)}
        {LEFT_UNIT(discussion)}
        {RIGHT_UNIT(discussion)}
        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#否定)">
          <text
            id="否定-2"
            transform="translate(558.59 550.09)"
            font-size="40"
            font-family="HiraMinProN-W6, Hiragino Mincho ProN"
          >
            <tspan x="-80" y="0">
              {jalabel[2]}
            </tspan>
          </text>
        </g>

        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#中立)">
          <text
            id="中立-2"
            data-name="中立"
            transform="translate(236.66 550.09)"
            font-size="40"
            font-family="HiraMinProN-W6, Hiragino Mincho ProN"
          >
            <tspan x="-80" y="0">
              {jalabel[1]}
            </tspan>
          </text>
        </g>
        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#承認)">
          <text
            id="承認-3"
            data-name="承認"
            transform="translate(399 292)"
            font-size="40"
            font-family="HiraMinProN-W6, Hiragino Mincho ProN"
          >
            <tspan x="-80" y="0">
              {jalabel[0]}
            </tspan>
          </text>
        </g>
        <text
          id="Digital_Democracy"
          data-name="Digital
Democracy"
          transform="translate(674.169 440.037) rotate(45)"
          font-size="28"
          font-family="Helvetica-Bold, Helvetica"
          font-weight="700"
        >
          <tspan x="-85.559" y="0">
            Digital
          </tspan>
          <tspan x="-150.979" y="34">
            Democracy
          </tspan>
        </text>
        <text
          id="Corporate_Libertarianism"
          data-name="Corporate
Libertarianism"
          transform="translate(42.546 439.617) rotate(-45)"
          font-size="28"
          font-family="Helvetica-Bold, Helvetica"
          font-weight="700"
        >
          <tspan x="0" y="0">
            Corporate
          </tspan>
          <tspan x="0" y="34">
            Libertarianism
          </tspan>
        </text>
        <text
          id="Synthetic_Technocracy"
          data-name="Synthetic
Technocracy"
          transform="translate(359 82)"
          font-size="28"
          font-family="Helvetica-Bold, Helvetica"
          font-weight="700"
        >
          <tspan x="-63.014" y="0">
            Synthetic
          </tspan>
          <tspan x="-85.34" y="34">
            Technocracy
          </tspan>
        </text>

        {/* {FIRST_BOX(discussion)} */}

        {/* {SECOND_BOX(discussion)} */}

        {/* {BOTTOM_BOX(discussion)} */}

        {HORIZONTAL_LOGO}
        {POSITIVE_NEUTRAL_NEGATIVE}
      </g>
    </svg>
  );
};

const v_to_negaposi = (v: number) => {
  if (v >= 1) {
    return "positive";
  } else if (v < 0) {
    return "negative";
  } else if (v == 0) {
    return "neutral";
  }
  return "error";
};
const v_to_jalabel = (v: number) => {
  if (v >= 1) {
    return "承認";
  } else if (v < 0) {
    return "否定";
  } else if (v == 0) {
    return "中立";
  }
  return "異常";
};

const TOP_UNIT = (discussion: Discussion) => {
  const vs = discussion.viewpoints.map((v) => takeOpinion(v.text).v);
  const negaposi = vs.map((v) => v_to_negaposi(v));
  return (
    <>
      <path
        id="前面オブジェクトで型抜き_6"
        data-name="前面オブジェクトで型抜き 6"
        d="M180.277-3097H24.115L-21-3142.114V-3347H229v201.276L180.277-3097h0Z"
        transform="translate(255 3403)"
        fill={`url(#${negaposi[0]})`}
      />
      <path
        id="前面オブジェクトで型抜き_6_-_アウトライン"
        data-name="前面オブジェクトで型抜き 6 - アウトライン"
        d="M179.034-3100,226-3146.967V-3344H-18v200.643L25.357-3100H179.034m1.243,3h0Zm0,0H24.115L-21-3142.114V-3347H229v201.276Z"
        transform="translate(255 3403)"
        fill="#ff8900"
      />
    </>
  );
};

const LEFT_UNIT = (discussion: Discussion) => {
  const vs = discussion.viewpoints.map((v) => takeOpinion(v.text).v);
  const negaposi = vs.map((v) => v_to_negaposi(v));
  const jalabel = vs.map((v) => v_to_jalabel(v));

  return (
    <>
      {/* fill */}
      <path
        id="前面オブジェクトで型抜き_7"
        d="M155.776-3018.447h0L-21-3195.223,130.776-3347h50l129.344,129.344v44.865L155.776-3018.447Z"
        transform="translate(40.879 3620)"
        fill={`url(#${negaposi[1]})`}
      />
      {/* outline */}
      <path
        id="前面オブジェクトで型抜き_7_-_アウトライン"
        d="M155.776-3022.69l151.345-151.344v-42.38L179.534-3344H132.019L-16.757-3195.223,155.776-3022.69m0,4.243h0L-21-3195.223,130.776-3347h50l129.344,129.344v44.865Z"
        transform="translate(40.879 3620)"
        fill="#ff8900"
      />
    </>
  );
};

const RIGHT_UNIT = (discussion: Discussion) => {
  const vs = discussion.viewpoints.map((v) => takeOpinion(v.text).v);
  const negaposi = vs.map((v) => v_to_negaposi(v));
  return (
    <>
      <path
        id="前面オブジェクトで型抜き_8"
        data-name="前面オブジェクトで型抜き 8"
        d="M182.655-3018.446h0L29-3172.1v-46.242L157.656-3347h50l151.778,151.777L182.655-3018.446Z"
        transform="translate(336 3620)"
        fill={`url(#${negaposi[2]})`}
      />
      <path
        id="前面オブジェクトで型抜き_8_-_アウトライン"
        data-name="前面オブジェクトで型抜き 8 - アウトライン"
        d="M182.655-3022.689,355.19-3195.223,206.412-3344H158.9L32-3217.1v43.757l150.655,150.656m0,4.243h0L29-3172.1v-46.242L157.656-3347h50l151.778,151.777Z"
        transform="translate(336 3620)"
        fill="#ff8900"
      />
    </>
  );
};

const FIRST_BOX = (discussion: Discussion) => {
  const r1 = (
    <foreignObject x="733" y="63" width="425" height="130">
      <div
        style={{
          color: "#ff8902",
          fontSize: "15px",
          fontWeight: "700",
          fontFamily: "Helvetica-Bold, Helvetica",
        }}
      >
        {discussion.viewpoints[0].text}
      </div>
    </foreignObject>
  );

  return (
    <>
      {/* first box */}
      <g id="グループ_11" data-name="グループ 11">
        <rect
          id="長方形_8"
          data-name="長方形 8"
          width="450"
          height="150"
          transform="translate(720 56)"
        />
        <path
          id="長方形_8_-_アウトライン"
          data-name="長方形 8 - アウトライン"
          d="M3,3V147H447V3H3M0,0H450V150H0Z"
          transform="translate(720 56)"
          fill="#ff8900"
        />
        <foreignObject x="733" y="63" width="425" height="130">
          {r1}
        </foreignObject>
      </g>
      <path
        id="線_7"
        data-name="線 7"
        d="M235,1.5H0v-3H235Z"
        transform="translate(482.5 131)"
        fill="#ff8900"
      />
    </>
  );
};
const SECOND_BOX = (discussion: Discussion) => {
  const r2 = (
    <foreignObject x="733" y="295" width="425" height="130">
      <div
        style={{
          color: "#ff8902",
          fontSize: "15px",
          fontWeight: "700",
          fontFamily: "Helvetica-Bold, Helvetica",
        }}
      >
        {discussion.viewpoints[2].text}
      </div>
    </foreignObject>
  );

  return (
    <>
      <g id="グループ_12" data-name="グループ 12" transform="translate(0 -33)">
        {/* second box */}
        <rect
          id="長方形_9"
          data-name="長方形 9"
          width="450"
          height="150"
          transform="translate(719 287)"
        />
        <path
          id="長方形_9_-_アウトライン"
          data-name="長方形 9 - アウトライン"
          d="M3,3V147H447V3H3M0,0H450V150H0Z"
          transform="translate(719 287)"
          fill="#ff8900"
        />
        {r2}
      </g>
      <path
        id="線_8"
        data-name="線 8"
        d="M119,1.5H0v-3H119Z"
        transform="translate(600 329)"
        fill="#ff8900"
      />
    </>
  );
};
const BOTTOM_BOX = (discussion: Discussion) => {
  const r3 = (
    <foreignObject x="733" y="460" width="425" height="130">
      <div
        style={{
          color: "#ff8902",
          fontSize: "15px",
          fontWeight: "700",
          fontFamily: "Helvetica-Bold, Helvetica",
        }}
      >
        {discussion.viewpoints[1].text}
      </div>
    </foreignObject>
  );

  return (
    <>
      <g id="グループ_13" data-name="グループ 13">
        {/* bottom box */}
        <rect
          id="長方形_10"
          data-name="長方形 10"
          width="450"
          height="150"
          transform="translate(719 452)"
        />
        <path
          id="長方形_10_-_アウトライン"
          data-name="長方形 10 - アウトライン"
          d="M3,3V147H447V3H3M0,0H450V150H0Z"
          transform="translate(719 452)"
          fill="#ff8900"
        />

        {r3}
      </g>
      {/* bottom line */}
      <path
        id="線_13"
        data-name="線 13"
        d="M322,1.5H0v-3H322Z"
        transform="translate(196.5 621.5)"
        fill="#ff8900"
      />
      <path
        id="線_14"
        data-name="線 14"
        d="M1.5,20h-3V0h3Z"
        transform="translate(196.5 601.5)"
        fill="#ff8900"
      />
      <path
        id="線_9"
        data-name="線 9"
        d="M107,1.5H0v-3H107Z"
        transform="translate(612.5 527.5)"
        fill="#ff8900"
      />
      <path
        id="線_12"
        data-name="線 12"
        d="M1.061,95.061l-2.121-2.121,94-94,2.121,2.121Z"
        transform="translate(518.5 527.5)"
        fill="#ff8900"
      />
    </>
  );
};
const HORIZONTAL_LOGO = (
  <text
    id="PLURAL_VIEWPOINTS"
    transform="translate(359 549)"
    fill="#ff8902"
    font-size="35"
    font-family="Times New Roman"
    font-weight="bold"
  >
    <tspan x="-71.073" y="0">
      PLURAL
    </tspan>
    <tspan x="-112.201" y="40">
      VIEWPOINTS
    </tspan>
  </text>
);

const POSITIVE_NEUTRAL_NEGATIVE = (
  <text
    id="POSITIVE_NEUTRAL_NEGATIVE"
    transform="translate(20 559)"
    fill="#63e8e2"
    font-size="20"
    font-family="Helvetica-Bold, Helvetica"
    font-weight="700"
  >
    <tspan x="0" y="0" fill="#63e8e2">
      POSITIVE
    </tspan>
    <tspan x="0" y="24" fill="#a3a3a3">
      NEUTRAL
    </tspan>
    <tspan x="0" y="48" fill="#fd3500">
      NEGATIVE
    </tspan>
  </text>
);

const PROMPT_BOX = (discussion: Discussion) => {
  return (
    <foreignObject x="0" y="0" width="150" height="800">
      {" "}
      <div>
        PROMPT:
        <div style={{ marginLeft: "0.5em" }}>{discussion.topic}</div>
      </div>
    </foreignObject>
  );
};

const Foo = null;
export default Foo;
