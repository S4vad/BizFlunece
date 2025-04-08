// src/components/shared/CustomBreadcrumb.jsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CustomBreadcrumb({ items }) {
  return (
    <Breadcrumb className="md:ml-10 mt-2 px-6 pt-4  text-muted-foreground">
      <BreadcrumbList >
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem className=" text-xs font-semibold text-gray-500">
              {item.href ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage className=" text-xs font-semibold text-gray-500" >{item.label}</BreadcrumbPage >
              )}
            </BreadcrumbItem >
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
