import axios from "axios";
import { useEffect, useState } from "react";
import { useSocket } from "../shared/useSocket";

const Component = () => {
  const { data, connect } = useSocket();
  const [page, setPage] = useState(0);

  useEffect(() => {
    connect();

    return () => null; // TODO disconnect from room
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemoveClick = async (id) => {
    axios.post(`${process.env.REACT_APP_HTTP_URL}/delete/${id}`);
  };

  const createHeadersHTML = (item) => {
    const {
      id,
      name,
      ip,
      fw,
      parentId,
      location,
      stat1,
      stat2,
      stat3,
      stat4,
      stat5,
      stat6,
    } = item;
    return `
        <td>${id}</td>
        <td>${parentId}</td>
        <td>${name}</td>
        <td>${ip}</td>
        <td>${fw}</td>
        <td>${location}</td>
        <td>${stat1}</td>
        <td>${stat2}</td>
        <td>${stat3}</td>
        <td>${stat4}</td>
        <td>${stat5}</td>
        <td>${stat6}</td>
      `;
  };

  const createHeaders = (item) => {
    const {
      id,
      name,
      ip,
      fw,
      parentId,
      location,
      stat1,
      stat2,
      stat3,
      stat4,
      stat5,
      stat6,
    } = item;
    return (
      <>
        <td>{id}</td>
        <td>{parentId}</td>
        <td>{name}</td>
        <td>{ip}</td>
        <td>{fw}</td>
        <td>{location}</td>
        <td>{stat1}</td>
        <td>{stat2}</td>
        <td>{stat3}</td>
        <td>{stat4}</td>
        <td>{stat5}</td>
        <td>{stat6}</td>
        <td>
          <a href="#" onClick={() => onRemoveClick(id)}>
            remove
          </a>
        </td>
      </>
    );
  };

  return (
    <>
      <div>WS Connected</div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>ParentId</th>
              <th>Name</th>
              <th>IP Address</th>
              <th>Firmware</th>
              <th>Location</th>
              <th>Stat1</th>
              <th>Stat2</th>
              <th>Stat3</th>
              <th>Stat4</th>
              <th>Stat5</th>
              <th>Stat6</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((v, i) => i >= page * 20 && i < (page + 1) * 20)
              .filter((d) => d.id)
              .map((d, i) => (
                <tr
                  key={d.id}
                  // dangerouslySetInnerHTML={{ __html: createHeadersHTML(d) }}
                >
                  {createHeaders(d)}
                </tr>
              ))}
          </tbody>
          {data.length && (
            <tfoot>
              <tr>
                <td colSpan={13}>
                  {page > 0 && (
                    <a href="#" onClick={() => setPage(page - 1)}>
                      Prev
                    </a>
                  )}
                  &nbsp;|&nbsp;
                  {page < data.length / 20}
                  <a href="#" onClick={() => setPage(page + 1)}>
                    Next
                  </a>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default Component;
