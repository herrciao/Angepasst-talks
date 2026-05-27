import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: '文章',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: '標題' },
          slug: { label: 'Slug（網址）', description: '自動從標題產生，可手動修改' },
        }),
        description: fields.text({
          label: '摘要',
          multiline: true,
        }),
        date: fields.date({
          label: '發布日期',
          defaultValue: { kind: 'today' },
        }),
        updatedDate: fields.date({
          label: '更新日期',
        }),
        category: fields.select({
          label: '分類',
          options: [
            { label: '商業 Business', value: 'business' },
            { label: '科技 Tech', value: 'tech' },
            { label: '書摘 Books', value: 'books' },
            { label: '生活 Life', value: 'life' },
          ],
          defaultValue: 'business',
        }),
        subcategory: fields.text({
          label: '子分類（選填）',
        }),
        tags: fields.array(
          fields.text({ label: '標籤' }),
          { label: '標籤', itemLabel: (props) => props.value }
        ),
        featured: fields.checkbox({
          label: '置頂精選',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: '草稿（不發布）',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: '內文',
        }),
      },
    }),
  },
});
