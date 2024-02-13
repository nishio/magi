import Image from "next/image";
import Link from "next/link";
import { discussions } from "../lib/data"; // Adjust the import path as necessary
import { Discussions } from "../components/Discussions";
import { AddTopic } from "../components/AddTopic";

const GPTs = (
  <ul className="list-disc ml-4 lg:ml-12">
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
);

export default function Home() {
  const Forum1 = (
    <a
      href="https://github.com/nishio/magi/discussions/2"
      className="text-blue-300 hover:text-blue-500 underline"
    >
      the forum
    </a>
  );

  const Forum2 = (
    <a
      href="https://github.com/nishio/magi/discussions/3"
      className="text-blue-300 hover:text-blue-500 underline"
    >
      the forum
    </a>
  );

  const Forum3 = (
    <a
      href="https://github.com/nishio/magi/discussions/4"
      className="text-blue-300 hover:text-blue-500 underline"
    >
      the forum
    </a>
  );

  const LinkToTopics = (title: string) => {
    return (
      <Link
        href={`https://magi-nishio.vercel.app/topics`}
        className="text-blue-300 hover:text-blue-500 underline"
      >
        {title}
      </Link>
    );
  };
  return (
    <div className="bg-slate-800 text-white min-h-screen lg:m-20">
      <h1 className="text-6xl font-bold">
        <a href="#" className="hover:underline">
          ⿻Plural Viewpoints
        </a>
      </h1>
      <h2 className="text-4xl font-bold mt-4">❓What is this?</h2>
      <p className="p">
        This is a tool that provides an opportunity for people to observe world
        from plural viewpoints. A single question posed by a human is answered
        by three virtual personalities with different ideologies.
      </p>
      <p className="p">
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

      <h2 className="text-4xl font-bold mt-4">📖How to use</h2>
      <p className="p">
        You can ask a question to three virtual personalities. The virtual
        personalities will answer yes/no to your question from their own
        perspectives. You can also see the consensus of the virtual
        personalities.
      </p>

      <h3 className="text-2xl font-semibold mt-4">✚{AddTopic}</h3>
      <p className="p">
        If you can make OpenAI API Key, you can use it in the {AddTopic} page.
      </p>

      <h3 className="text-2xl font-semibold mt-4">🤖GPTs</h3>
      <p className="p">
        If you have access to ChatGPT Plus. You can try following GPTs. If you
        get interesting results, please share them with me on the {Forum1}!
      </p>
      <p className="p">GPTs you can use:</p>
      {GPTs}

      <p className="p">
        If you don&apos;t have OpenAI API Key and access to GPTs, post your
        question on the {Forum2}.
      </p>

      <h3 className="text-2xl font-semibold mt-4">
        💬{LinkToTopics("Sample Discussions")}
      </h3>
      <p className="p">
        Here are some topics that I created. You can see more in{" "}
        {LinkToTopics("Topics Page")}.
      </p>
      <Discussions discussions={discussions} in_firestore={false} />

      <h2 className="text-4xl font-bold mt-4">🤝About Consensus</h2>
      <p className="p">
        This system does not use majority rule by voting. Consensus is reached
        when all three respondents are in the same direction, and weak consensus
        when some are neutral.
      </p>
      <p className="p">
        Even if AI charecters reached a consensus, it is only a provisional
        solution at this point. If you have any objections to the consensus
        reached by AI characters, please feel free to post them in {Forum3}!
      </p>
      <h2
        className="text-4xl font-bold mt-4"
        id="political-ideologies-for-the-21st-century"
      >
        🌍What is &quot;Political Ideologies for the 21st Century&quot;
      </h2>
      <p className="p">
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
      <p className="p">
        I find this concept to be very valuable when thinking about the future
        of society, but on the other hand, I feel it&apos;s challenging to
        explain and make people understand it in words. That&apos;s why I&apos;m
        creating this web service that people can experience.
      </p>

      <h2
        className="text-4xl font-bold mt-4"
        id="political-ideologies-for-the-21st-century"
      >
        📚What is &quot;MAGI System&quot;
      </h2>
      <p className="p">
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
      <p className="p">It inspired me to create this web service.</p>

      <h2 className="text-4xl font-bold mt-4">🔄Share this service</h2>
      <Image
        src="/qr.png"
        alt="QR code"
        className="max-w-xs"
        width={300}
        height={300}
      />

      <h2 className="text-4xl font-bold mt-4">📝About the Author</h2>
      <p className="p">
        <a
          href="https://scrapbox.io/nishio-en/"
          className="text-blue-300 hover:text-blue-500 underline"
        >
          NISHIO Hirokazu
        </a>
      </p>
      <p className="p">
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
