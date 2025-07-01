import React, { useState, lazy } from "react";
import styles from "./dictionary.module.css";
import { vocabularyData } from "../../data/data";
import CourseView from "./views/CourseView";
import ModuleView from "./views/ModuleView";
import BlockView from "./views/BlockView";
import LessonView from "./views/LessonView";
import WordListView from "./views/WordListView";
import KnownWordsView from "./views/KnownWordsView";
import UnknownWordsView from "./views/UnknownWordsView";
import Random from "./views/random";

const Menu = lazy(() => import("../../components/menu/menu"));


const Dictionary = () => {
  const [view, setView] = useState("course");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [randomWords, setRandomWords] = useState([]);

  const handleBack = () => {
    if (view === "words") {
      setSelectedLesson(null);
      setView("lessons");
    } else if (view === "lessons") {
      setSelectedBlock(null);
      setView("blocks");
    } else if (view === "blocks") {
      setSelectedModule(null);
      setView("modules");
    } else if (view === "modules") {
      setSelectedCourse(null);
      setView("course");
    }
  };


  return (
    <div className={styles.dictionary}>
      {view === "course" && (
        <CourseView
          course={vocabularyData[0]}
          setView={setView}
          setRandomWords={setRandomWords}
          onNext={(course) => {
            setSelectedCourse(course);
            setView("modules");
          }}
          onBack={handleBack}
          onKnown={() => setView("known")}
          onUnknown={() => setView("unknown")}
        />
      )}
      {view === "modules" && (
        <ModuleView setView={setView}
          modules={selectedCourse.modules}
          onBack={handleBack}
          onNext={(module) => {
            setSelectedModule(module);
            setView("blocks");
          }}
        />
      )}
      {view === "blocks" && (
        <BlockView setView={setView}
          selectedModule={selectedModule}
          onBack={handleBack}
          onNext={(block) => {
            setSelectedBlock(block);
            setView("lessons");
          }}
        />
      )}
      {view === "lessons" && (
        <LessonView setView={setView}
          selectedBlock={selectedBlock}
          onBack={handleBack}
          onNext={(lesson) => {
            setSelectedLesson(lesson);
            setView("words");
          }}
        />
      )}
      {view === "words" && (
        <WordListView setView={setView}
          selectedLesson={selectedLesson}
          onBack={handleBack}

          onNext={(word) => {
            setRandomWords(selectedLesson.words);
            setView("random");
          }}
        />
      )}
      {view === "known" && <KnownWordsView setView={setView} onBack={() => setView("course")} setRandomWords={setRandomWords} />}
      {view === "unknown" && <UnknownWordsView setView={setView} onBack={() => setView("course")} setRandomWords={setRandomWords} />}
      {view === "random" && <Random setView={setView} onBack={() => setView("course")} words={randomWords}
      />}
      <Menu />
    </div>
  );
};

export default Dictionary;
