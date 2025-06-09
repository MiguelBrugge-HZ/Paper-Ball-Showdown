import { FactResponse } from './interfaces.js';

/**
 * Function to get data from a server
 * @param {string} url The URL to fetch data from.
 * @returns {Promise<FactResponse>} A promise that resolves to the API response
 * containing the data or an error.
 */
export const getData = async (url: string): Promise<FactResponse> => {
  try {
    const res: Response = await fetch(url);
    const items: FactResponse = await res.json();
    return items;
  } catch (error) {
    return {
      error,
    };
  }
};

/**
 * Function to get all data from different urls
 * @param {string} appUrlsData An array of URL paths to fetch data from.
 * @returns {Promise<FactResponse[]>} A promise that resolves to an array of
 * FactResponse objects from the provided URLs.
 */
export const getAllDataFromDifferentUrls = async (
  appUrlsData: string[]
): Promise<FactResponse[]> => {
  // setup the promises
  const promises: Promise<FactResponse>[] = appUrlsData.map((url: string) =>
    getData(`http://localhost:3010${url}`)
  );
  // fetch all appointments
  try {
    const items: FactResponse[] = await Promise.all(promises);
    return items;
  } catch (error: unknown) {
    console.log('🐮', error);
    return [{ error }];
  }
};

/**
 * Function to get data from a server
 * @param {string} url The URL to fetch data from.
 * @returns {Promise<FactResponse>} A promise that resolves to the API response
 * containing the data or an error.
 */
export const getDataFromAuthenticatedApi = async (url: string): Promise<FactResponse> => {
  try {
    const res: Response = await fetch(url, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      }});
    const items: FactResponse = await res.json();
    return items;
  } catch (error) {
    return {
      error,
    };
  }
};
