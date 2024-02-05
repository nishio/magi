import { takeOpinion } from "@/lib/takeOpinion";
import Image from "next/image";
import Link from "next/link";
import { Discussion, discussions } from "../lib/data"; // Adjust the import path as necessary

const YesNoSpan = ({ v }: { v: number }) => {
  if (v === 2) {
    return <span className="bg-green-500 px-1 mx-1">STRONG YES</span>;
  } else if (v == 1) {
    return <span className="bg-green-700 px-1 mx-1">Yes</span>;
  } else if (v == 0) {
    return <span className="bg-gray-700 px-1 mx-1">Neutral</span>;
  } else if (v == -1) {
    return <span className="bg-red-700 px-1 mx-1">No</span>;
  } else if (v == -2) {
    return <span className="bg-red-500 px-1 mx-1">STRONG NO</span>;
  } else {
    return <span className="bg-gray-700 px-1 mx-1">System Error</span>;
  }
};

const Discussions = () => {
  const listItems = discussions.map((discussion) => (
    <li key={discussion.id}>
      <Link
        href={`/d/${discussion.id}`}
        className="text-blue-300 hover:text-blue-500 underline"
      >
        {discussion.topic}
      </Link>
      <YesNoSpan v={takeOpinion(discussion.viewpoints[0].text).v} />
      <YesNoSpan v={takeOpinion(discussion.viewpoints[1].text).v} />
      <YesNoSpan v={takeOpinion(discussion.viewpoints[2].text).v} />
    </li>
  ));

  return <ul className="list-disc ml-4">{listItems}</ul>;
};

export default function Home() {
  return (
    <div className="bg-slate-800 text-white min-h-screen">
      <nav className="flex flex-wrap items-center space-x-2 text-sm md:mx-4 md:my-4">
        <a href="#" className="hover:underline">
          Plural Viewpoints
        </a>
      </nav>
      <h2 className="text-4xl font-bold mt-4">What is this?</h2>
      <p>
        This is a tool that provides an opportunity for people to observe world
        from plural viewpoints. A single question posed by a human is answered
        by three virtual personalities with different ideologies.
      </p>
      <p>
        There is a Japanese proverb that says, &quot;
        <a
          href="https://scrapbox.io/nishio-en/When_three_people_gather,_devine_wisdom_emerges"
          className="text-blue-300 hover:text-blue-500 underline"
        >
          When three people gather, devine wisdom emerges.
        </a>
        &quot; Good wisdom can be gained when three people with different
        perspectives come together to think.
      </p>
      <h2 className="text-4xl font-bold mt-4">How to use</h2>
      <p>
        (You can ask a question to the virtual personalities. The virtual
        personalities will answer your question from their own perspectives. You
        can also see the consensus of the virtual personalities.)
      </p>
      <p>
        Ideally, in the future, users will be able to pitch their topics of
        interest to multiple virtual personalities. For the sake of AI execution
        cost, I am currently showing the output executed at my end. If you have
        access to GPTs, you can try it yourself. If you get interesting results,
        please share them with me!
      </p>
      <h3 className="text-2xl font-semibold mt-4">GPTs you can use:</h3>
      <ul className="list-disc ml-4">
        <li>
          <a
            href="https://chat.openai.com/g/g-UOUeqC8dJ-synthetic-technocracy"
            className="text-blue-300 hover:text-blue-500 underline"
          >
            ChatGPT - Synthetic Technocracy
          </a>
        </li>
        <li>
          <a
            href="https://chat.openai.com/g/g-8jVsJ1tcW-corporate-libertarianism"
            className="text-blue-300 hover:text-blue-500 underline"
          >
            ChatGPT - Corporate Libertarianism
          </a>
        </li>
        <li>
          <a
            href="https://chat.openai.com/g/g-lRzyfvWfZ-digital-democracy"
            className="text-blue-300 hover:text-blue-500 underline"
          >
            ChatGPT - Digital Democracy
          </a>
        </li>
      </ul>

      <h3 className="text-2xl font-semibold mt-4">Sample Discussions:</h3>
      <Discussions />

      <h2 className="text-4xl font-bold mt-4">About Consensus</h2>
      <p>
        This system does not use majority rule by voting. Consensus is reached
        when all three respondents are in the same direction, and weak consensus
        when some are neutral.
      </p>

      <h2
        className="text-4xl font-bold mt-4"
        id="political-ideologies-for-the-21st-century"
      >
        What is &quot;Political Ideologies for the 21st Century&quot;
      </h2>
      <p>
        &quot;
        <a
          href="https://www.radicalxchange.org/media/blog/political-ideologies-for-the-21st-century/"
          className="text-blue-300 hover:text-blue-500 underline"
        >
          Political Ideologies for the 21st Century
        </a>
        &quot; is a blog entry written by E. Glen Weyl. In this blog entry, he
        talks about three political ideologies that are emerging in the 21st
        century.
      </p>
      <p>
        I find this concept to be very valuable when thinking about the future
        of society, but on the other hand, I feel it&apos;s challenging to
        explain and make people understand it in words. That&apos;s why I&apos;m
        creating this web service that people can experience.
      </p>

      <h2
        className="text-4xl font-bold mt-4"
        id="political-ideologies-for-the-21st-century"
      >
        What is &quot;MAGI System&quot;
      </h2>
      <p>
        The &quot;
        <a
          href="https://scrapbox.io/nishio-en/MAGI_System"
          className="text-blue-300 hover:text-blue-500 underline"
        >
          MAGI System
        </a>
        &quot; is a fictional supercomputer system from the Japanese science
        fiction anime &quot;Neon Genesis Evangelion.&quot; It consists of three
        independent but interconnected supercomputers, and each supercomputer
        represents a different aspect of human thought.
      </p>
      <p>It inspired me to create this web service.</p>

      <h2 className="text-4xl font-bold mt-4">About the Author</h2>
      <p>
        <a
          href="https://scrapbox.io/nishio-en/"
          className="text-blue-300 hover:text-blue-500 underline"
        >
          NISHIO Hirokazu
        </a>
      </p>
      <p>
        <a
          href="https://github.com/nishio/magi"
          className="text-blue-300 hover:text-blue-500 underline"
        >
          Source codes
        </a>
      </p>
    </div>
  );
}
