import { properties, SPK_TEACHER_DOMAIN } from "@/server/Config/Const";

const getTeacherDomain = (): string | null => {
  return properties.getProperty(SPK_TEACHER_DOMAIN);
};

const initTeacherDomain = (): boolean => {
  properties.deleteProperty(SPK_TEACHER_DOMAIN);

  return getTeacherDomain === null;
};

const setTeacherDomain = (domain: string): boolean => {
  properties.setProperty(SPK_TEACHER_DOMAIN, domain);

  return getTeacherDomain !== null;
};

export { getTeacherDomain, initTeacherDomain, setTeacherDomain };
