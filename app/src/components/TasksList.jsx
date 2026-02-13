import React, { useState, useEffect, useRef } from "react";
import TaskItem from "./TaskItem";
import "../styles/taskList.css";

const TaskList = ({ tasks, onToggle, onDelete, onUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnyTaskEditing, setIsAnyTaskEditing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);

  // Create an extended tasks array for infinite looping
  const extendedTasks =
    tasks.length > 1 ? [tasks[tasks.length - 1], ...tasks, tasks[0]] : tasks;

  const stopTimer = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
  const resetTimer = () => {
    if (timeoutRef.current) clearInterval(timeoutRef.current);
    if (tasks.length > 1 && !isAnyTaskEditing) {
      timeoutRef.current = setInterval(nextSlide, 3000);
    }
  };

  const nextSlide = () => {
    if (tasks.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (tasks.length <= 1) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    nextSlide();
    resetTimer();
  };

  const handlePrev = () => {
    prevSlide();
    resetTimer();
  };
  // Jump to the real first/last slide without animation when transition ends
  const handleTransitionEnd = () => {
    if (currentIndex >= extendedTasks.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
    if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(extendedTasks.length - 2);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [tasks.length, isAnyTaskEditing]);

  useEffect(() => {
    if (tasks.length <= 1) {
      setCurrentIndex(0);
      setIsTransitioning(false);
    } else {
      setCurrentIndex(1);
      setIsTransitioning(true);
    }
  }, [tasks.length]);

  if (tasks.length === 0) {
    return <div className="no-tasks">There is no tasks to show here</div>;
  }

  return (
    <div className="carousel-container">
      {!isAnyTaskEditing && (
        <button className="carousel-btn prev" onClick={handlePrev}>
          ❮
        </button>
      )}

      <div
        className="carousel-viewport"
        onMouseEnter={stopTimer}
        onMouseLeave={resetTimer}
      >
        <div
          className="carousel-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
          }}
        >
          {extendedTasks.map((task, index) => (
            <div className="carousel-slide" key={`${task.id}-${index}`}>
              <TaskItem
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onEditStart={() => setIsAnyTaskEditing(true)}
                onEditEnd={() => setIsAnyTaskEditing(false)}
              />
            </div>
          ))}
        </div>
      </div>
      {!isAnyTaskEditing && (
        <button className="carousel-btn next" onClick={handleNext}>
          ❯
        </button>
      )}
    </div>
  );
};

export default TaskList;
