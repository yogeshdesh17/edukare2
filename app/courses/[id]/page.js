import CourseDetailClient from './CourseDetailClient';
import { COURSES } from '../../../lib/data';

export function generateStaticParams() {
  return COURSES.map(c => ({ id: c.id }));
}

export function generateMetadata({ params }) {
  const course = COURSES.find(c => c.id === params.id);
  if (!course) return {};
  return { title: `${course.title} — Edukare Academy, Kharadi Pune` };
}

export default function CourseDetailPage({ params }) {
  return <CourseDetailClient id={params.id} />;
}
