// Checks the content files in src/data so mistakes are caught before they reach the site.
import { existsSync } from 'fs';
import { join } from 'path';
import events from '../data/events.json';
import team from '../data/team.json';
import respected from '../data/respected.json';
import blogs from '../data/blogs.json';
import site from '../data/site.json';

const publicFile = (path: string) => existsSync(join(__dirname, '../../public', path));
const bilingual = (value: { kn?: string; en?: string } | undefined) => Boolean(value?.kn?.trim() && value?.en?.trim());
const validDate = (iso: string) => /^\d{4}-\d{2}-\d{2}$/.test(iso) && !Number.isNaN(new Date(iso).getTime());

describe('content files (src/data)', () => {
  it('events.json: unique ids, valid dates, both languages, files exist', () => {
    const ids = events.map((event) => event.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const event of events) {
      expect([event.id, validDate(event.date)]).toEqual([event.id, true]);
      expect([event.id, bilingual(event.title), bilingual(event.description)]).toEqual([event.id, true, true]);
      for (const image of [event.poster, event.posterSmall, ...(event.gallery ?? [])].filter(Boolean) as string[]) {
        expect([event.id, image, publicFile(image)]).toEqual([event.id, image, true]);
      }
    }
  });

  it('team.json: unique years, every member has a name, role and photo', () => {
    const years = team.map((entry) => entry.year);
    expect(new Set(years).size).toBe(years.length);
    for (const entry of team) {
      for (const group of entry.groups) {
        expect([entry.year, group.id, bilingual(group.title)]).toEqual([entry.year, group.id, true]);
        for (const member of group.members) {
          expect([member.id, bilingual(member.name), bilingual(member.role)]).toEqual([member.id, true, true]);
          expect([member.id, member.photo, publicFile(member.photo)]).toEqual([member.id, member.photo, true]);
        }
      }
    }
  });

  it('respected.json, blogs.json and site.json point to files that exist', () => {
    for (const member of respected.members) {
      if (member.photo) expect([member.id, publicFile(member.photo)]).toEqual([member.id, true]);
    }
    for (const video of blogs) {
      expect([video.id, bilingual(video.title), publicFile(video.video)]).toEqual([video.id, true, true]);
    }
    for (const slide of site.heroSlides) {
      if (slide.imageSmall) expect([slide.imageSmall, publicFile(slide.imageSmall)]).toEqual([slide.imageSmall, true]);
      expect([slide.image, publicFile(slide.image), bilingual(slide.caption)]).toEqual([slide.image, true, true]);
    }
    for (const image of Object.values(site.images)) {
      expect([image, publicFile(image)]).toEqual([image, true]);
    }
  });
});
