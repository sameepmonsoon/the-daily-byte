import PaginationComponent from '@/components/common/pagination';
import AdminBlogsTable from '@/components/tables/dashboard/blogs-table'
import AdminDeletedBlogsTable from '@/components/tables/dashboard/deleted-blogs-table ';
import { parseSearchParams } from '@/lib/utils';
import { AdminBlogs } from '@/types/dashboard/dashboard-types';
import React from 'react'
interface SearchParamType {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default async function DeletedBlogsListPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) { const params = await searchParams
    const fetchOptions = parseSearchParams({
    ...params
  }); 
  return (
    <div><AdminDeletedBlogsTable blogs={blogs}/><div className='flex items-center justify-between mt-8 flex-1'>
        <PaginationComponent               currentPage={fetchOptions.page ? parseInt(fetchOptions.page) : 1}
 totalPages={60} className='flex-1 justify-start md:justify-center' />
      </div></div>
  )
}
export const blogs: AdminBlogs [] = [
  {
    id: 1,
    title: 'asporto corrigo defessus villa comptus',
    slug: 'asporto-corrigo-defessus-villa-comptus',
    description: 'Urbanus strues capio.',
    content:
      'Subseco tondeo decimus attollo incidunt adnuo tolero. Utroque convoco sit. Vergo temeritas contigo corpus consuasor thymum decipio theatrum.\nCompono templum ter uredo decretum tamisium. Omnis suadeo demitto. Astrum suspendo correptius desparatus cito totus urbanus vilis cotidie peior.\nLibero aliqua ustilo voco ascit curriculum neque soleo nam. Substantia suppellex soluta concedo abstergo desipio ademptio facilis arbitro corpus. Contego pariatur territo trucido timor enim dignissimos expedita crux.',
    categoryId: 10,
    category: 'Technology',
    imageId: 2,
    image: '/images/carousel-1.png',
    active: true,
    createdAt: '2025-10-08T09:00:00Z',
    updatedAt: '2025-10-08T09:00:00Z',
  },
  {
    id: 2,
    title: 'pectus stabilis sonitus verbum tolero',
    slug: 'pectus-stabilis-sonitus-verbum-tolero',
    description: 'Aestivus curvo amplus compono.',
    content:
      'Adversus atqui textilis circumvenio thema utrimque. Crastinus beatus carmen pecco audacia cogo creber. Aspernatur tardus vilicus fugiat varietas.\nSpeculum peccatus stipes carcer. Capillus degusto tamdiu. Arceo dens canis consuasor quisquam villa vinco tracto.\nCompello tergo spectaculum supellex pecto aurum cumque vigilo. Desidero comes valetudo capto valetudo colligo.',
    categoryId: 5,
    category: 'Lifestyle',
    imageId: 4,
    image: '/images/carousel-2.png',
    active: false,
    createdAt: '2025-10-07T15:20:00Z',
    updatedAt: '2025-10-07T15:45:00Z',
  },
  {
    id: 3,
    title: 'vulgus cedo aureus demens theatrum',
    slug: 'vulgus-cedo-aureus-demens-theatrum',
    description: 'Concedo iusto coniuratio veritas.',
    content:
      'Pecto tyrannus clementia decor attonbitus. Tabesco aer undique talis. Totus appositus trado ustulo depraedor dignissimos ascisco.\nSuper caterva thema amiculum uterque. Unde supellex thymum possimus curvo. Textilis ascisco cicuta auditor voluptas.\nTotidem antea compono tergiversatio. Stipes somniculosus totus canto distinctio usitas. Tabernus tracto sodalitas cito cultura.',
    categoryId: 8,
    category: 'Business',
    imageId: 6,
    image: '/images/carousel-1.png',
    active: true,
    createdAt: '2025-10-06T12:10:00Z',
    updatedAt: '2025-10-08T07:30:00Z',
  },
  {
    id: 21,
    title: 'pectus stabilis sonitus verbum tolero',
    slug: 'pectus-stabilis-sonitus-verbum-tolero',
    description: 'Aestivus curvo amplus compono.',
    content:
      'Adversus atqui textilis circumvenio thema utrimque. Crastinus beatus carmen pecco audacia cogo creber. Aspernatur tardus vilicus fugiat varietas.\nSpeculum peccatus stipes carcer. Capillus degusto tamdiu. Arceo dens canis consuasor quisquam villa vinco tracto.\nCompello tergo spectaculum supellex pecto aurum cumque vigilo. Desidero comes valetudo capto valetudo colligo.',
    categoryId: 5,
    category: 'Lifestyle',
    imageId: 4,
    image: '/images/carousel-2.png',
    active: false,
    createdAt: '2025-10-07T15:20:00Z',
    updatedAt: '2025-10-07T15:45:00Z',
  },
  {
    id: 31,
    title: 'vulgus cedo aureus demens theatrum',
    slug: 'vulgus-cedo-aureus-demens-theatrum',
    description: 'Concedo iusto coniuratio veritas.',
    content:
      'Pecto tyrannus clementia decor attonbitus. Tabesco aer undique talis. Totus appositus trado ustulo depraedor dignissimos ascisco.\nSuper caterva thema amiculum uterque. Unde supellex thymum possimus curvo. Textilis ascisco cicuta auditor voluptas.\nTotidem antea compono tergiversatio. Stipes somniculosus totus canto distinctio usitas. Tabernus tracto sodalitas cito cultura.',
    categoryId: 8,
    category: 'Business',
    imageId: 6,
    image: '/images/carousel-1.png',
    active: true,
    createdAt: '2025-10-06T12:10:00Z',
    updatedAt: '2025-10-08T07:30:00Z',
  },
];
