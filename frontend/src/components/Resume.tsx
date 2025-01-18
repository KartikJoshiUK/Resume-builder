import React, { forwardRef } from "react";
import { FaGithub, FaGlobe, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { ResumeType } from "../constants/ResumeType";

function Icon({ icon }: { icon: string }) {
  switch (icon) {
    case "github":
      return <FaGithub />;
    case "linkedIn":
      return <FaLinkedin />;
    case "portfolio":
      return <FaGlobe />;
    case "mobile":
      return <FaPhoneAlt />;
    case "mail":
      return <BiLogoGmail />;
    default:
      return null;
  }
}

type Props = {
  data: ResumeType;
};

function Resume({ data }: Props, ref: React.Ref<HTMLDivElement>) {
  return (
    <div ref={ref} id="resume" className="p-6 flex flex-col gap-4 max-w-4xl">
      <section className="flex flex-col items-center">
        {data.header.name.url ? (
          <a
            target="_blank"
            className="font-bold text-4xl"
            href={data.header.name.url}
          >
            {data.header.name.text}
          </a>
        ) : (
          <h1 className="font-bold text-4xl">{data.header.name.text}</h1>
        )}
        <h2>{data.header.designation}</h2>
        <nav>
          <ul className="flex gap-3 flex-wrap justify-center">
            {data.header.socials.map((social) => (
              <li key={social.url}>
                <a
                  className="flex gap-1 items-center"
                  target="_blank"
                  href={social.url}
                >
                  <Icon icon={social.icon} />
                  <span>{social.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-center mx-14">{data.header.bio}</p>
      </section>
      <section>
        <h2 className="font-bold border-b text-2xl">{data.skills.heading}</h2>
        <ul className="list-disc ml-6 text-xs">
          {data.skills.categoryList.map((category) => (
            <li key={category.category}>
              <div className="flex gap-2">
                <h3 className="font-semibold">{category.category}</h3>
                <ul className="flex gap-1 flex-wrap">
                  {category.skillList.map((skill, index) => (
                    <li key={skill}>
                      <span>
                        {skill}
                        {index + 1 === category.skillList.length ? "." : ","}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-bold border-b text-2xl">{data.work.heading}</h2>
        <ol className="list-decimal ml-6 text-xs">
          {data.work.experienceList.map((work) => (
            <li key={work.company}>
              <div className="flex gap-2">
                <h3 className="font-semibold">
                  <a target="_blank" href={work.url}>
                    {work.company}
                  </a>
                </h3>
                <p>{work.role}</p>
              </div>
              <p>
                {work.location} | {work.duration}
              </p>
              <ul className="list-disc ml-6">
                {work.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h2 className="font-bold border-b text-2xl">
          {data.freelance.heading}
        </h2>
        <ol className="list-decimal ml-6 text-xs">
          {data.freelance.experienceList.map((freelance) => (
            <li key={freelance.company}>
              <div className="flex gap-2">
                <h3 className="font-semibold">
                  <a target="_blank" href={freelance.url}>
                    {freelance.company}
                  </a>
                </h3>
                <p>{freelance.role}</p>
              </div>
              <p>
                {freelance.location} | {freelance.duration}
              </p>
              <ul className="list-disc ml-6">
                {freelance.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h2 className="font-bold border-b text-2xl">{data.projects.heading}</h2>
        <ol className="list-decimal ml-6 text-xs">
          {data.projects.projectList.map((projects) => (
            <li key={projects.title}>
              <div className="flex gap-2">
                <h3 className="font-semibold">
                  {projects.url ? (
                    <a href={projects.url}>{projects.title}</a>
                  ) : (
                    <span>{projects.title}</span>
                  )}
                </h3>
              </div>
              <ul className="list-disc ml-6">
                {projects.details?.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h2 className="font-bold border-b text-2xl">
          {data.education.heading}
        </h2>
        <ol className="list-decimal ml-6 text-xs">
          {data.education.educationList.map((education) => (
            <li key={education.institution}>
              <div className="flex gap-2">
                <h3 className="font-semibold">
                  <a href={education.url}>{education.institution}</a>
                </h3>
                <p>{education.course}</p>
              </div>
              <p>
                {education.location} | {education.duration}
              </p>
              <ul className="list-disc ml-6">
                {education.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <h2 className="font-bold border-b text-2xl">
          {data.certifications.heading}
        </h2>
        <ul className="list-disc ml-6 text-xs">
          {data.certifications.certificationList.map((certification) => (
            <li key={certification.url}>
              <div className="flex gap-2">
                <a className="font-semibold" href={certification.url}>
                  {certification.title}
                </a>
                {" | "}
                <h3>{certification.institution}</h3>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
export default forwardRef(Resume);
